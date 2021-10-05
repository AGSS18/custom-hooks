import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null});

        fetch(url)
            .then(response => response.json())
            .then(data => {

                if(isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data: data,
                    });
                }

            })
            .catch(()=>{
                setState({data: null, loading: false, error: 'No se pudo cargar la data'});
            });

    }, [url]);

    return state;

}

//el useRef en este caso me va a permitir montar y desmontar el componente de multiple hooks y asi evitar errores ya que al no usarse arroja un error que dice que 'Can't perform React state update on unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function'