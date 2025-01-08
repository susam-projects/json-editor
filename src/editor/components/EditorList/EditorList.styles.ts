import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => ({
  editor: css`
    /* all editor styles are here because repeated usage of 'useStyles' has a drastic performance effect */
    .editor-list {
      &__row-margin {
        height: ${token.marginLG}px;
      }

      &__row-border {
        border-bottom: 1px solid ${token.colorBorder};
      }

      &__add-button {
        text-align: center;
        margin-bottom: 8px;
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
        &-read,
        &-edit {
          display: flex;
        }

        &-read:hover {
          color: ${token.colorPrimary};
        }

        &__label {
          flex-basis: 200px;
          min-width: 200px;
          flex-grow: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &__value {
          min-width: 250px;
          flex-grow: 1;
          padding: ${token.paddingXS}px ${token.padding}px;
        }

        &__edit-value {
          min-width: 250px;
          flex-grow: 1;
          padding: ${token.paddingXS}px ${token.padding}px;
          color: ${token.colorText};
          input,
          textarea {
            width: 100%;
          }
        }

        &__controls {
          flex-basis: 200px;
          min-width: 190px;
          flex-grow: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
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
