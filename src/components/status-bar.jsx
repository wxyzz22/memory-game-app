import * as React from 'react';

export default function StatusBar({name, value, type, active, isModal}) {
    if (type === 'single' && name === 'Time') {
        return (
            <div className='status-bar-wrapper'>
                {isModal ? (<></>) : <div className={active ? 'triangle-show' : 'triangle-noshow'}></div>}
                <div className={`status-bar ${active ? 'active-player' : ''}`}>
                    <div className='status-bar-title font-18'>{name}</div>
                    <div className='status-bar-content font-32'>{value.min < 10 ? '0'+value.min : value.min}: {value.sec < 10 ? '0' + value.sec : value.sec}</div>
                </div>
                {isModal ? (<></>) : <div className={active ? 'text-show' : 'text-noshow'}>CURRENT TURN</div>}
            </div>
        );
    }
    return (
        <div className='status-bar-wrapper'>
            {isModal ? (<></>) : <div className={active ? 'triangle-show' : 'triangle-noshow'}></div>}
            <div className={`status-bar ${active ? 'active-player' : ''} ${/Winner/.test(name) ? 'winner-blue' : ''}`}>
                <div className='status-bar-title font-18'>{name}</div>
                <div className='status-bar-content font-32'>{value}</div>
            </div>
            {isModal ? (<></>) : <div className={active ? 'text-show' : 'text-noshow'}>CURRENT TURN</div>}
        </div>
    );
}