import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import './start-styles.scss';

function StartPage() {
  const navigate = useNavigate();

  function checkToken() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="startRoot">
      <div className="startRoot__buttonBox">
        <Button className="btn" variant="contained" onClick={() => navigate('/register')}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
