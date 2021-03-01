import {combineReducers} from 'redux';
import articlereducer from './ajout_article';
import adminreducer from './admin';
import categoriereducer from './categories';
import commentairereducer from './commentaires';
import emailreducer from './newsletter';

export default combineReducers(
     {
        articlereducer,
        adminreducer,
        categoriereducer,
        commentairereducer,
        emailreducer,
        

    }
)