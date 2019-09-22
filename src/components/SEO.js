import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import avatar from '../assets/images/avatar.jpg'

export default class SEO extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    isPost: PropTypes.bool
  }

  static defaultProps = {
    title: 'Pierre Le Guen',
    image: `https://leguen.fr${avatar}`,
    url: 'https://leguen.fr/',
    description: 'Pierre Le Guen - Student, Freelancer & Software Developer',
    isPost: false
  }

  render() {
    const { image, url, description, isPost } = this.props
    const title = (this.props.title === '' ? '' : `${this.props.title} · `) + 'Pierre Le Guen'
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        sameAs: [
          'https://twitter.com/Pierre_Le_Guen',
          'https://www.github.com/PierreLeGuen',
          'https://www.linkedin.com/in/pierre-le-guen',
          'https://www.gitlab.com/pleguen'
        ],
        url: url,
        name: title,
        alternateName: description
      }
    ]

    if (isPost) {
      schemaOrgJSONLD.push([
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          sameAs: [
            'https://twitter.com/Pierre_Le_Guen',
            'https://www.github.com/PierreLeGuen',
            'https://www.linkedin.com/in/pierre-le-guen',
            'https://www.gitlab.com/pleguen'
          ],
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image: image
              }
            }
          ]
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          sameAs: [
            'https://twitter.com/Pierre_Le_Guen',
            'https://www.github.com/PierreLeGuen',
            'https://www.linkedin.com/in/pierre-le-guen',
            'https://www.gitlab.com/pleguen'
          ],
          url: url,
          name: title,
          alternateName: `${url} | Pierre Le Guen`,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image
          },
          description
        }
      ])
    }

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

        <meta property="fb:app_id" content="302184056577324" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={isPost ? 'article' : 'website'} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dantehemerson" />
        <meta name="twitter:creator" content="@dantehemerson" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    )
  }
}
