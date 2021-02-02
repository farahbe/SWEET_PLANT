import {combineReducers} from 'redux';
import articlereducer from './ajout_article';
import adminreducer from './admin';


export default combineReducers(
     {
        articlereducer,
        adminreducer,

    }
)