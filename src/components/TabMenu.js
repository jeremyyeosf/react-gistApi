import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

const TabMenuDemo = () => {

    const items = [
        {label: 'Public Gists', icon: 'pi pi-fw pi-home', url: '/'},
        {label: 'BookmarkedGists', icon: 'pi pi-fw pi-calendar', url: "/bookmarkedGists"},
        {label: 'PersonalGists', icon: 'pi pi-fw pi-pencil', command:()=>{ window.location = "/personalGists"}}
    ];

    return (
        <div>
            <div className="card">
                <TabMenu model={items} />
            </div>
        </div>
    );
}
             
export default TabMenuDemo