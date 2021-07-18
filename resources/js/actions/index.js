import { ADD_NEW_BANNER } from "../const/index";
export const actNewBanner = (content) => {
  return {
    type: ADD_NEW_BANNER,
    content,
  };
};
