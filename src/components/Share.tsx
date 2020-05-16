import { Typography, Space } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { fullAppUrl } from "../helpers";

const { Paragraph } = Typography;

const url = "https://heldeninmijnbuurt.be";
const title =
  "Het platform voor wie mondmaskers naait en wie mondmaskers zoekt. Vind elkaar via POSTCODE.";
const hashtag = "NationaleNaaiActie";
const size = 32;

type TProps = {
  body: string;
  message?: string;
};

const Share = ({ body, message = title }: TProps) => {
  return (
    <div>
      <Typography>
        <Paragraph>{body}</Paragraph>
      </Typography>
      <Space size="large">
        <FacebookShareButton url={url} quote={message} hashtag={`#${hashtag}`}>
          <FacebookIcon size={size} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={message}
          hashtags={[hashtag]}
          via="coronadenktank"
        >
          <TwitterIcon size={size} />
        </TwitterShareButton>
        {/*
          <TumblrShareButton
            url={url}
            title={message}
            tags={["TODO"]}
            caption="TODO"
          >
            <TumblrIcon size={size} />
          </TumblrShareButton>
        <EmailShareButton
          url={url}
          subject="Word een superheld"
          body={message + "\n\n" + appDescription}
        >
          <EmailIcon size={size} />
        </EmailShareButton>
        */}
      </Space>
    </div>
  );
};

export default Share;
