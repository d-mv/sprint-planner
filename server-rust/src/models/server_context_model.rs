use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub struct ServerContext {
    pub requestId: String,
}
