import { Button, Typography, Modal } from "antd";
import { useApi, useUser, useGoto } from "../../hooks";

const { Paragraph } = Typography;

type TProps = {
  hasPending: boolean;
};

const Stop = ({ hasPending }: TProps) => {
  const goto = useGoto();
  const { updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me/action");

  return (
    <div style={{ textAlign: "right" }}>
      <Button
        type="link"
        size="small"
        style={{ fontSize: 10 }}
        danger
        onClick={() => {
          Modal.confirm({
            title: "Ben je zeker dat je geen maskers meer wilt maken?",
            content: (
              <Typography>
                <Paragraph>
                  Zo spijtig om je te zien gaan. Ook als je nu stopt, kan je
                  erna terugkomen. Wij vergeten niet hoeveel mondmaskers je
                  gemaakt hebt.
                </Paragraph>
                {hasPending ? (
                  <Paragraph type="secondary">
                    We zien dat je nog open aanvragen hebt.
                    <br />
                    Niet mee inzitten. Wij regelen alles voor jou. We
                    verwittigen zelf de aanvragers en we zoeken voor hen een
                    nieuwe superheld hun de buurt.
                  </Paragraph>
                ) : (
                  <Paragraph type="secondary">
                    We zien dat je alles netjes afgewerkt hebt. Bedankt, zo
                    moeten wij geen nieuwe superhelden meer zoeken voor
                    openstaande aanvragen.
                  </Paragraph>
                )}
                <Paragraph>
                  Je buurt bedankt je in ieder geval voor je inzet!
                </Paragraph>
              </Typography>
            ),
            centered: true,
            okText: "Ja, ik stop",
            okButtonProps: { danger: true },
            onOk: async () => {
              await callApi({ name: "unsetIsMaker" });
              updateUser({ isMaker: false });
              await goto();
            },
            cancelText: "Ik help verder",
          });
        }}
      >
        ik wil geen maskers meer maken
      </Button>
    </div>
  );
};

export default Stop;
