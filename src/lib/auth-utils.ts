// Utility function to trigger the login modal from anywhere in the app
export const showLoginModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('showLoginModal'));
  }
};
