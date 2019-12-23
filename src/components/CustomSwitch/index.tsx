import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
 
import { ServiceTypeColor } from '../ServiceMap';

export const CustomSwitch = (color: ServiceTypeColor) => {
    return withStyles({
        switchBase: {
            color,
            '&$checked': {
                color,
            },
            '&$checked + $track': {
                backgroundColor: color,
            },
        },
        checked: {},
        track: {},
    })(Switch);
};