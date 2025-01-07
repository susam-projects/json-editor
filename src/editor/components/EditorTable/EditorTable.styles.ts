import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => ({
  table: css`
    table-layout: fixed;
    width: 100%;

    /* all table styles are here because repeated usage of 'useStyles' has a drastic performance effect */
    .editor-table {
      &__label-column {
        width: 200px;
      }

      &__buttons-column {
        width: 190px;
      }

      &__row-margin {
        height: ${token.marginLG}px;
      }

      &__row-border {
        border-bottom: 1px solid ${token.colorBorder};
      }

      &__add-button {
        text-align: center;
      }

      &__row-controls {
        text-align: right;
      }

      &__delete-row-button {
        &:hover {
          color: ${token.colorWhite};
          background-color: ${token.colorError};
        }
      }

      &__field {
        &-read:hover {
          color: ${token.colorPrimary};
        }

        &-hidden {
          display: none;
        }

        &__label {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &__value {
          padding: ${token.paddingXS}px ${token.padding}px;
        }

        &__edit-value {
          padding: ${token.paddingXS}px ${token.padding}px;
          color: ${token.colorText};
          input,
          textarea {
            width: 100%;
          }
        }

        &__controls {
          text-align: right;
        }

        &__edit-button {
          cursor: pointer;
        }

        &__add-line-button {
          margin-left: ${token.marginXS}px;
          cursor: pointer;
        }

        &__delete-button {
          cursor: pointer;
          &:hover {
            color: ${token.colorWhite};
            background-color: ${token.colorError};
          }
        }

        &__apply-button {
          cursor: pointer;
          &:hover {
            color: ${token.colorWhite};
            background-color: ${token.colorSuccess};
          }
        }

        &__cancel-button {
          cursor: pointer;
        }
      }
    }
  `,
}));
