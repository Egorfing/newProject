import React from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '../../../entites/Counter';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {t('Главная страница')}
            <Counter/>
        </div>
    );
};

export default MainPage;
