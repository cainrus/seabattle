import type ButtonProps from "./ButtonProps";

export default function DoneMenuButton({ onClick }: ButtonProps) {
    return (<div style={{
            fontSize: '.7em',
            onClick:{onClick},
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>DONE</div>)
}
