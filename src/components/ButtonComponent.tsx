
import { Button} from '@mui/material';
import {motion} from 'framer-motion';

interface ButtonComponentProps {
    text:string,
    color:string
}

export default function ButtonComponent({text,color} :ButtonComponentProps) {
    return (
        <motion.div
                        whileHover={{
                        scale: 1.1,
                        boxShadow : "0px 0px 8px rgb(255, 255, 255)",
                        borderColor:"#747bff"
                        }}>
            <Button
            type='submit'
            className={`cursor-pointer rounded text-white px-6 py-3 ${color}`}
            size='medium'
            variant='contained'>
                {text}
            </Button>
        </motion.div>

    )
}
