use structopt::StructOpt;

#[derive(StructOpt)]
pub struct Options {
    #[structopt(short = "p", long = "port", default_value = "9999")]
    /// Port to assign to
    pub port: u16,
    #[structopt(short = "t", long = "token")]
    /// GitLab API token
    pub token: String,
    #[structopt(short = "u", long = "url")]
    /// GitLab API url, i.e. https://gitlab.healthcareit.net/api/v4
    pub base_url: String,

    /// Jira REST API url, i.e. https://jira.healthcareit.net/rest/api/2
    #[structopt(short = "j", long = "jira_url")]
    pub jira_base_url: String,

    /// Jira credentials in format "user:password" in base64
    #[structopt(short = "c", long = "jira_credentials")]
    pub jira_credentials: String,
}

pub fn options() -> Options {
    Options::from_args()
}
