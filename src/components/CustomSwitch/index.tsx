import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
 
import { ServiceTypeColor } from '../ServiceMap';

export const CustomSwitch = (color?: ServiceTypeColor) => {
    let switchColor = color || '#34495e';

    return withStyles({
        switchBase: {
            color: switchColor,
            '&$checked': {
                color: switchColor,
            },
            '&$checked + $track': {
                backgroundColor: switchColor,
            },
        },
        checked: {},
        track: {},
    })(Switch);
};