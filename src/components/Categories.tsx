import React from 'react';

type CategoriesProps = {
    value: number,
    onClickCategoryId: (i: number) => void;
}


const Categories: React.FC<CategoriesProps> = ({value, onClickCategoryId}) => {
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
                    categories.map((categoryName, index) => (
                        <li
                            key={categoryName + "idx"}
                            onClick={() => onClickCategoryId(index)}
                            className={value === index ? "active" : ''}>
                            {categoryName}
                        </li>

                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;