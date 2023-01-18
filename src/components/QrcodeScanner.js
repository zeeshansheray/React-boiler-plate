import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'

export default function QrcodeScanner({onScan, onError, className, qrClass}) {

    return (
        <div className={`w-100 qr-div ${className}`}>
            <QrReader
                delay     = {300}
                onError   = {onError}
                onScan    = {onScan}
                className = {`w-80 ${qrClass}`}
            />
        </div>
    )
}
