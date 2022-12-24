import { openConfirmModal } from '@mantine/modals';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { OrderRequestBody } from '../pages/OrderPage';
import { api } from './api/api';

const isCartActionFulfilled = (action: any) =>
  // @ts-ignore Они там есть! Просто из-за injectEndpoints ts об этом не знает
  api.endpoints.addCartItem.matchFulfilled(action) ||
  // @ts-ignore Они там есть! Просто из-за injectEndpoints ts об этом не знает
  api.endpoints.editCartItem.matchFulfilled(action) ||
  // @ts-ignore Они там есть! Просто из-за injectEndpoints ts об этом не знает
  api.endpoints.postOrder.matchFulfilled(action);

/**
 * Если у нас какая то ошибка нетворка - выводим уведомление об этом
 */
export const ErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isCartActionFulfilled(action)) {
      if (action.payload.status === 402) {
        openConfirmModal({
          title: 'Ошибка!',
          centered: true,
          children: <OrderRequestBody />,
          labels: { confirm: 'Delete account', cancel: "No don't delete it" },
          confirmProps: { color: 'red' },
          onCancel: () => console.log('Cancel'),
          onConfirm: () => console.log('Confirmed'),
        });
      }
    }

    return next(action);
  };
