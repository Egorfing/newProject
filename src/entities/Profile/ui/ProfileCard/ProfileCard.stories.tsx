import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';
import avatar from 'shared/assets/test/avatar.png'

export default {
    title: 'features/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'adminov',
    first: 'ads',
    city: 'SPB',
    currency: Currency.RUB,
    avatar: avatar,
  }
};


export const WithError = Template.bind({});
WithError.args = {error: 'true'};


export const Loading = Template.bind({});
Loading.args = {isLoading: true};
