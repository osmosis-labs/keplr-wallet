import React, { FunctionComponent, useCallback } from "react";
import { Button } from "reactstrap";

import { FormattedMessage } from "react-intl";

import style from "./style.module.scss";

export const ConfirmDialog: FunctionComponent<{
  img?: React.ReactElement;
  title?: string;
  paragraph: string;

  yes?: string;
  no?: string;

  hideNo?: boolean;

  onConfirm?: () => void;
  onReject?: () => void;
}> = ({
  img: imgElement,
  title,
  paragraph,
  yes,
  no,
  hideNo,
  onConfirm,
  onReject,
}) => {
  const noCallback = useCallback(
    (e) => {
      if (onReject) {
        onReject();
      }
      e.preventDefault();
    },
    [onReject]
  );

  return (
    <div className={style.dialog}>
      <div className={style.bodyContainer}>
        {imgElement ? imgElement : null}
        {title ? <h1>{title}</h1> : null}
        <p>{paragraph}</p>
      </div>
      <div className={style.buttons}>
        {!hideNo ? (
          <Button
            type="button"
            size="sm"
            color="default"
            outline
            onClick={noCallback}
          >
            {no ? no : <FormattedMessage id="confirm.no" />}
          </Button>
        ) : null}

        <Button
          type="button"
          size="sm"
          color="primary"
          onClick={useCallback(
            (e) => {
              if (onConfirm) {
                onConfirm();
              }
              e.preventDefault();
            },
            [onConfirm]
          )}
        >
          {yes ? yes : <FormattedMessage id="confirm.yes" />}
        </Button>
      </div>
    </div>
  );
};
