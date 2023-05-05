import { Route, Routes } from 'react-router-dom';
import AddGame from '../../modules/AddGame';
import UpdateGame from '../../modules/UpdateGame';
import Games from '../../modules/Games';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Games />} />
            <Route path='game' element={<AddGame />} />
            <Route path='updategame/:id' element={<UpdateGame />} />
        </Routes>
    );
};

export default AppRoutes;