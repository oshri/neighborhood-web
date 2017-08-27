import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

class User extends Component{
    constructor(props){
        super(props);
        this.fullName = this.fullName.bind(this);
    }

    render(){
        const { classes, data } = this.props;

        return (
            <div className={classes.row}>
                <Typography type="caption" gutterBottom align="center">{this.fullName()}</Typography>
                <Avatar alt={data.first_name + data.last_name} src={data.picture.data.url} className={classes.avatar} />
            </div>
        );
    }

    fullName(){
        const { data } = this.props;
        return `${data.first_name} ${data.last_name}`;
    }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'space-around',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    margin: 10,
  }
};

export default withStyles(styles)(User);