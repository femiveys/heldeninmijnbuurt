import objectToGetParams from "react-share/es/utils/objectToGetParams";
import createShareButton from "react-share/es/hocs/createShareButton";

function emailLink(url: any, _a: any) {
  var subject = _a.subject,
    body = _a.body,
    separator = _a.separator;
  return (
    "mailto:" +
    objectToGetParams({
      subject: subject,
      body: body ? body + separator + url : url,
    })
  );
}

var EmailShareButton = createShareButton(
  "email",
  emailLink,
  function (props: any) {
    return {
      subject: props.subject,
      body: props.body,
      separator: props.separator || " ",
    };
  },
  {
    openShareDialogOnClick: false,
    onClick: function (_: any, link: any) {
      // you should put here the code that opens the link in a new window.
      // something like this :
      window.open(link, "_blank");
    },
  }
);

export default EmailShareButton;
