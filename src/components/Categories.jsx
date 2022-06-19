import React from 'react';

function Categories(props) {
    const [activeIndex, setActiveIndex] = React.useState(0)

    const onClickCategory = (index) => {
        setActiveIndex(index)
    }

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((title, index) => (
                        <li
                            key={title + "idx"}
                            onClick={() => onClickCategory(index)}
                            className={activeIndex === index ? "active" : ''}>
                            {title}
                        </li>

                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;