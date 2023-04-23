<template>
  <product-zoomer
    :base-images="images || images_default"
    :base-zoomer-options="zoomerOptions" />
</template>

<script>
export default {
  name: 'GoodsViewer',
  props: {
    images: Object
  },
  data () {
    return {
      images_default: {
        thumbs: [{
          id: 1,
          url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/1.jpeg'
        }
        // {
        //   id: 3,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/3.jpeg'
        // }, {
        //   id: 4,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/4.jpeg'
        // }, {
        //   id: 5,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/5.jpeg'
        // }, {
        //   id: 6,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/6.jpeg'
        // }, {
        //   id: 7,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/7.jpeg'
        // }, {
        //   id: 8,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/8.jpeg'
        // }, {
        //   id: 9,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/9.jpeg'
        // }
        ],
        normal_size: [{
          id: 1,
          url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/1.jpeg'
        }
        // {
        //   id: 3,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/3.jpeg'
        // }, {
        //   id: 4,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/4.jpeg'
        // }, {
        //   id: 5,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/5.jpeg'
        // }, {
        //   id: 6,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/6.jpeg'
        // }, {
        //   id: 7,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/7.jpeg'
        // }, {
        //   id: 8,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/8.jpeg'
        // }, {
        //   id: 9,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/9.jpeg'
        // }
        ],
        large_size: [{
          id: 1,
          url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/1.jpeg'
        }
        // {
        //   id: 3,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/3.jpeg'
        // }, {
        //   id: 4,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/4.jpeg'
        // }, {
        //   id: 5,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/5.jpeg'
        // }, {
        //   id: 6,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/6.jpeg'
        // }, {
        //   id: 7,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/7.jpeg'
        // }, {
        //   id: 8,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/8.jpeg'
        // }, {
        //   id: 9,
        //   url: 'https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/9.jpeg'
        // }
        ]
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: 'pane',
        hoverDelay: 300,
        namespace: 'zoomer-bottom',
        move_by_click: false,
        scroll_items: 4,
        choosed_thumb_border_color: '#dd2c00',
        scroller_position: 'bottom',
        zoomer_pane_position: 'right'
      }
    }
  }
}
</script>
