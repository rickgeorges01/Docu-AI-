'use client'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import React from 'react';

type props = {
    children: React.ReactNode
}

const queryClient = new QueryClient()
const Providers = ( { children }:props) => {
    return (
       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default Providers;
