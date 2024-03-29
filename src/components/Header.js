import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({onAdd}) => {

    return(
        <header className='header'>
            <h1>Task Tracker</h1>
            <Button color='green' text='Add' onClick={onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
