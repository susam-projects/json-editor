import { createStyles } from 'antd-style';

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
        width: 50px;
      }

      &__row-margin {
        height: ${token.marginLG}px;
        &:nth-last-child(-n + 2) {
          display: none;
        }
      }

      &__row-border {
        border-bottom: 1px solid ${token.colorBorder};
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
          input, textarea {
            width: 100%;
          }
        }

        &__controls {
          text-align: right;
        }

        &__edit-icon {
          cursor: pointer;
        }

        &__remove-icon {
          cursor: pointer;
          &:hover {
            color: ${token.colorError};
          }
        }

        &__apply-icon {
          cursor: pointer;
          &:hover {
            color: ${token.colorSuccess};
          }
        }

        &__cancel-icon {
          cursor: pointer;
          &:hover {
            color: ${token.colorError};
          }
        }
      }
    }
  `,
}));
