import {combineReducers} from 'redux';
import articlereducer from './ajout_article';
import adminreducer from './admin';
import categoriereducer from './categories';


export default combineReducers(
     {
        articlereducer,
        adminreducer,
        categoriereducer,

    }
)