import { Typography, Space } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  TumblrShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TumblrIcon,
  EmailIcon,
} from "react-share";

const { Paragraph } = Typography;

const url = "https://heldeninmijnbuurt.be";
const title =
  "Dit platform brengt mensen die maskers naaien in contact met mensen in de buurt die maskers zoeken";
const hashtag = "#NationaleNaaiActie";
const size = 32;

// TODO:
// - Twitter
//   - via vragen.
//   - related vragen.

//

type TProps = {
  message?: string;
};

const Share = ({ message = title }: TProps) => {
  return (
    <div>
      <Typography>
        <Paragraph>
          Ook jij kan een held worden door het bestaan van dit platform op
          sociale media te delen.
        </Paragraph>
      </Typography>
      <Space size="large">
        <FacebookShareButton url={url} quote={title} hashtag={hashtag}>
          <FacebookIcon size={size} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={title}
          hashtags={[hashtag]}
          via="@coronadenktank"
        >
          <TwitterIcon size={size} />
        </TwitterShareButton>
        <TumblrShareButton
          url={url}
          title={title}
          tags={["TODO"]}
          caption="TODO"
        >
          <TumblrIcon size={size} />
        </TumblrShareButton>
        <EmailShareButton url={url} subject="Word een superheld" body="TODO">
          <EmailIcon size={size} />
        </EmailShareButton>
      </Space>
    </div>
  );
};

export default Share;
