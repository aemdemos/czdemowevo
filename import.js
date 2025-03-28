/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import modal1Parser from './parsers/modal1.js';
import fragment2Parser from './parsers/fragment2.js';
import modal3Parser from './parsers/modal3.js';
import carousel4Parser from './parsers/carousel4.js';
import modal5Parser from './parsers/modal5.js';
import modal6Parser from './parsers/modal6.js';
import quote7Parser from './parsers/quote7.js';
import modal8Parser from './parsers/modal8.js';
import carousel9Parser from './parsers/carousel9.js';
import accordion10Parser from './parsers/accordion10.js';
import modal11Parser from './parsers/modal11.js';
import modal13Parser from './parsers/modal13.js';
import modal14Parser from './parsers/modal14.js';
import modal15Parser from './parsers/modal15.js';
import quote__with_attribution_16Parser from './parsers/quote__with_attribution_16.js';
import modal17Parser from './parsers/modal17.js';
import modal18Parser from './parsers/modal18.js';
import accordion19Parser from './parsers/accordion19.js';
import quote__with_attribution_20Parser from './parsers/quote__with_attribution_20.js';
import tabs21Parser from './parsers/tabs21.js';
import search22Parser from './parsers/search22.js';
import columns23Parser from './parsers/columns23.js';
import carousel24Parser from './parsers/carousel24.js';
import modal25Parser from './parsers/modal25.js';
import modal26Parser from './parsers/modal26.js';
import columns__three_columns_27Parser from './parsers/columns__three_columns_27.js';
import modal28Parser from './parsers/modal28.js';
import columns29Parser from './parsers/columns29.js';
import fragment30Parser from './parsers/fragment30.js';
import hero31Parser from './parsers/hero31.js';
import modal32Parser from './parsers/modal32.js';
import tabs33Parser from './parsers/tabs33.js';
import accordion34Parser from './parsers/accordion34.js';
import tabs35Parser from './parsers/tabs35.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
  Metadata: metadataParser,
      'Modal 1': modal1Parser,
    'Fragment 2': fragment2Parser,
    'Modal 3': modal3Parser,
    'Carousel 4': carousel4Parser,
    'Modal 5': modal5Parser,
    'Modal 6': modal6Parser,
    'Quote 7': quote7Parser,
    'Modal 8': modal8Parser,
    'Carousel 9': carousel9Parser,
    'Accordion 10': accordion10Parser,
    'Modal 11': modal11Parser,
    'Modal 13': modal13Parser,
    'Modal 14': modal14Parser,
    'Modal 15': modal15Parser,
    'Quote (with attribution) 16': quote__with_attribution_16Parser,
    'Modal 17': modal17Parser,
    'Modal 18': modal18Parser,
    'Accordion 19': accordion19Parser,
    'Quote (with attribution) 20': quote__with_attribution_20Parser,
    'Tabs 21': tabs21Parser,
    'Search 22': search22Parser,
    'Columns 23': columns23Parser,
    'Carousel 24': carousel24Parser,
    'Modal 25': modal25Parser,
    'Modal 26': modal26Parser,
    'Columns (three columns) 27': columns__three_columns_27Parser,
    'Modal 28': modal28Parser,
    'Columns 29': columns29Parser,
    'Fragment 30': fragment30Parser,
    'Hero 31': hero31Parser,
    'Modal 32': modal32Parser,
    'Tabs 33': tabs33Parser,
    'Accordion 34': accordion34Parser,
    'Tabs 35': tabs35Parser,
};

const pageElements = [
  {
    name: 'Metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // get dom elements for each block on the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });

  // remove fragment elements from the current page
  fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath))
    .forEach((element) => {
      element.remove();
    });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = cluster ? `${name} ${cluster}` : name;
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    let items = null;
    try {
      items = parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
    // remove empty items
    if (Array.isArray(items)) {
      items = items.filter((item) => item);
    }
    if (!WebImporter.Import.isEmpty(items)) {
      // create the block
      const block = WebImporter.Blocks.createBlock(document, {
        name,
        cells: items,
      });
      if (block) {
        // add block to DOM
        main.append(block);
      }
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
