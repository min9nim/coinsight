import domtoimage from 'dom-to-image'
import { toast } from 'react-hot-toast'

export default function CaptureScreen() {
    return (
        <span
            onClick={async () => {
                const dataUri = await domtoimage.toPng(
                    document.getElementById('root'),
                )
                const blob = await fetch(dataUri).then(res => res.blob())
                await navigator.clipboard.write([
                    new window.ClipboardItem({ 'image/png': blob }),
                ])

                toast.success('captured!')
            }}
            style={{
                backgroundColor: '#222',
                cursor: 'pointer',
                padding: '1px',
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 10px'
            }}
        >
            <img
                src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMuMiIvPgogICAgPHBhdGggZD0iTTkgMkw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJIOXptMyAxNWMtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo="
                alt="Try html2canvas"
                className="css-1bgbwga"
            />
        </span>
    )
}
