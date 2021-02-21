import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../static/theme";

const useStyles = makeStyles(() => ({
    root: {
        height: 245,
        width: 400,
        padding: 20,
        backgroundColor: colors.red.error,
        borderRadius: 10,
        color: '#fff',
        textAlign: 'center',
    }
}))

export default useStyles