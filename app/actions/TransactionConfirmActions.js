import alt from "../altInstance";
import {ChainConfig} from "yoyowjs-ws";

class TransactionConfirmActions {

    confirm(transaction) {
        return {transaction};
    }

    broadcast(transaction) {
        return (dispatch) => {
            dispatch({broadcasting: true});

            let broadcast_timeout = setTimeout(() => {
                this.actions.error("Your transaction has expired without being confirmed, please try again later.");
            }, ChainConfig.expire_in_secs * 2000);

            transaction.broadcast(() => {
                dispatch({broadcasting: false, broadcast: true});
            }).then( (res)=> {
                clearTimeout(broadcast_timeout);
                dispatch({
                    error: null,
                    broadcasting: false,
                    broadcast: true,
                    included: true,
                    trx_id: res[0].id,
                    trx_block_num: res[0].block_num,
                    broadcasted_transaction: true
                });
            }).catch( error => {
                console.error(error);
                clearTimeout(broadcast_timeout);
                let splitError = error.message.split( "\n" );
                let message = splitError[splitError.length === 1 ? 0 : 1];
                dispatch({
                    broadcast: false,
                    broadcasting: false,
                    error: message
                });
            });
        };
    }

    wasBroadcast(res){
        return res;
    }

    wasIncluded(res){
        return res;
    }

    close() {
        return true;
    }

    error(msg) {
        return {error: msg};
    }
}

export default alt.createActions(TransactionConfirmActions);