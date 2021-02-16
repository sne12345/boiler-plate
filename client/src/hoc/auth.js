import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function ( SpecificComponent, option, adminRoute = null ){       // adminRoute 는 관리자만 들어갈수있는

    // option //
    // null : 아무나 출입가능
    // true : 로그인한 유저만 출입가능
    // false : 로그인한 유저는 출입불가능

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response);

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    } else {
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
            })

            
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}