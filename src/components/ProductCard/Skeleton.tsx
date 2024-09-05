import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props: any) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
      <rect x="454" y="571" rx="3" ry="3" width="178" height="6" />
      <circle cx="123" cy="123" r="120" />
      <rect x="0" y="252" rx="10" ry="10" width="280" height="28" />
      <rect x="0" y="308" rx="15" ry="15" width="280" height="88" />
      <rect x="10" y="420" rx="14" ry="14" width="83" height="34" />
      <rect x="124" y="411" rx="16" ry="16" width="155" height="44" />
    </ContentLoader>
)


