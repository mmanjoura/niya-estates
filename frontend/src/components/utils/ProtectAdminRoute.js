const ProtectAdminRoute = () => {

  try {
    const user = {
      full_name: window.localStorage.getItem('full_name'),
      email: window.localStorage.getItem('user_email'),
      user_type: window.localStorage.getItem('user_type'),
      phone_number: window.localStorage.getItem('user_phone'),
      user_id: window.localStorage.getItem('user_id'),
      profile: window.localStorage.getItem('profile')
    };

    return user;
  } catch (error) {

  }

};

export default ProtectAdminRoute;
