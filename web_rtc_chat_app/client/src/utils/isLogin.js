import React from 'react';

const lsLogin = () => !!localStorage.getItem('u_id')

export default lsLogin;