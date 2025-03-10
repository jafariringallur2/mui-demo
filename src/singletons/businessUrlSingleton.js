let businessUrl = import.meta.env.VITE_BUSINESS_URL;

export const getBusinessUrl = () => businessUrl;

export const setBusinessUrl = (newBusinessUrl) => {
  businessUrl = newBusinessUrl;
};