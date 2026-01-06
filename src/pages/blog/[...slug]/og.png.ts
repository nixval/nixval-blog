import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { formatDate } from '../../../utils';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }) {
  const { post } = props;
  
  // FIX: Use jsDelivr CDN for reliable TTF font serving
  // This prevents the "Unsupported OpenType signature" error caused by GitHub raw links
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
  ).then((res) => res.arrayBuffer());

  const regularFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
  ).then((res) => res.arrayBuffer());

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {
                    children: 'AstroDaisy Blog',
                    style: {
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#a6adbb',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    children: post.data.title,
                    style: {
                      fontSize: 72,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1.1,
                      marginBottom: 20,
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    children: [
                      {
                        type: 'span',
                        props: {
                          children: formatDate(post.data.pubDate),
                          style: { marginRight: 30 },
                        },
                      },
                      ...(post.data.tags || []).slice(0, 3).map((tag) => ({
                        type: 'span',
                        props: {
                          children: `#${tag}`,
                          style: {
                            backgroundColor: '#2b3440',
                            color: '#d1d5db',
                            padding: '4px 12px',
                            borderRadius: 8,
                            fontSize: 24,
                            marginLeft: 10,
                          },
                        },
                      })),
                    ],
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 28,
                      color: '#a6adbb',
                    },
                  },
                },
              ],
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: 80,
                backgroundColor: '#1d232a',
                backgroundImage: 'radial-gradient(circle at 25px 25px, #2a323c 2%, transparent 0%), radial-gradient(circle at 75px 75px, #2a323c 2%, transparent 0%)',
                backgroundSize: '100px 100px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 12,
                backgroundImage: 'linear-gradient(to right, #7480ff, #ff52d9)',
              },
            },
          },
        ],
        style: {
          display: 'flex',
          width: '100%',
          height: '100%',
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: regularFontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
