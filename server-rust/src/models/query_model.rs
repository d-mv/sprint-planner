use serde_derive::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Query<Payload> {
    pub domain: String,
    pub action: String,
    pub payload: Option<Payload>,
}

pub type QueryConnect = Query<String>;
pub type QueryConnectN = Query<String>;
