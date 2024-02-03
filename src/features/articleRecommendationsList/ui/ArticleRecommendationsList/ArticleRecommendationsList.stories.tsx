import { ComponentStory, ComponentMeta } from '@storybook/react'
import withMock from 'storybook-addon-mock'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [withMock]
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
)
const article = {
  id: '1',
  title: 'Scala news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://coursefreedl.com/wp-content/uploads/2020/01/Scala-Zero-To-Hero-Complete-Guide.jpg',
  views: 10222,
  createdAt: '24.01.2022',
  userId: '1',
  type: ['IT'],
  blocks: []
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        {...article, id: '1'},
        {...article, id: '2'},
        {...article, id: '3'},
      ]
    }
  ]
}
