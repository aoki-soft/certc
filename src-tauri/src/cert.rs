use rsa::RsaPrivateKey;
use rsa::pkcs8::EncodePrivateKey;
use rand::rngs::OsRng;
use rcgen::{Certificate, CertificateParams,
	DistinguishedName, date_time_ymd};
use tracing::{info, span, Level, debug, trace};


#[derive(serde::Serialize)]
pub(super) struct CertOutput {
  fingerprint: String,
  pem_cert: String,
  pem_private_key: String,
  der_cert: Vec<u8>,
  der_private_key: Vec<u8>
}

#[derive(serde::Deserialize, Debug)]
struct YearMonthDay {
  year: i32,
  month: u8,
  day: u8,
}

#[derive(serde::Deserialize, Debug)]
pub(super) struct CertInput {
  start: YearMonthDay,
  end: YearMonthDay
}


pub(super) fn create_cert(cert_input: CertInput) -> Result<CertOutput, String>{
  let span = span!(Level::TRACE, "create_cert");
  debug!("{:?}", cert_input);
  info!("証明書を作成します");
  let mut params = CertificateParams::default();
  params.not_before = date_time_ymd(cert_input.start.year, cert_input.start.month, cert_input.start.day);
  params.not_after = date_time_ymd(cert_input.end.year, cert_input.end.month, cert_input.end.day);
  params.distinguished_name = DistinguishedName::new();

  params.alg = &rcgen::PKCS_RSA_SHA256;

  let mut rng = OsRng;
  let bits = 2048;
  let private_key = RsaPrivateKey::new(&mut rng, bits).unwrap();
  let private_key_der = private_key.to_pkcs8_der().unwrap();
  let key_pair = rcgen::KeyPair::try_from(private_key_der.as_ref()).unwrap();
  params.key_pair = Some(key_pair);

  trace!("{:?}", params.alg);

  let cert = Certificate::from_params(params).unwrap();
  let pem_serialized = cert.serialize_pem().unwrap();
  let der_serialized = pem::parse(&pem_serialized).unwrap().contents;
  let hash = ring::digest::digest(&ring::digest::SHA512, &der_serialized);
  let hash_hex :String = hash.as_ref().iter()
    .map(|b| format!("{:02x}", b))
    .collect();
  trace!("sha-512 fingerprint: {}", hash_hex);
  trace!("{}", pem_serialized);
  trace!("{}", cert.serialize_private_key_pem());

  let cert_output = CertOutput{
    fingerprint: hash_hex,
    pem_cert: pem_serialized,
    pem_private_key: cert.serialize_private_key_pem(),
    der_cert: der_serialized,
    der_private_key: cert.serialize_private_key_der()
  };
  let _enter = span.enter();
  Ok(cert_output)
}
