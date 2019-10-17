import React from 'react'

type PropTypes = {
    title: string,
    subtitle?: string,
}

const Header: React.FC<PropTypes> = props => {
    const { title, subtitle } = props;
    return (
        <div>
            <h4>{title}</h4>
        </div>
    )
}
    

export default Header;