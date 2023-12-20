import React, { useEffect } from 'react';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
export interface IChatbotAIProps {}
declare global {
    interface Window {
        kommunicate: any;
    }
}
export function ChatbotAI(props: IChatbotAIProps) {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = {
                appId: '1fd185171ade31186e780346624c49e20',
                popupWidget: true,
                automaticChatOpenOnNavigation: true,
            };
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
            var h = document.getElementsByTagName('head')[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    });
    return <div></div>;
}
