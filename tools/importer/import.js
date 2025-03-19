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
import columns2Parser from './parsers/columns2.js';
import modal3Parser from './parsers/modal3.js';
import modal4Parser from './parsers/modal4.js';
import quote__with_attribution_5Parser from './parsers/quote__with_attribution_5.js';
import modal6Parser from './parsers/modal6.js';
import tabs7Parser from './parsers/tabs7.js';
import accordion8Parser from './parsers/accordion8.js';
import hero9Parser from './parsers/hero9.js';
import columns10Parser from './parsers/columns10.js';
import modal11Parser from './parsers/modal11.js';
import accordion13Parser from './parsers/accordion13.js';
import hero14Parser from './parsers/hero14.js';
import modal15Parser from './parsers/modal15.js';
import modal16Parser from './parsers/modal16.js';
import table__striped___bordered_17Parser from './parsers/table__striped___bordered_17.js';
import cards18Parser from './parsers/cards18.js';
import carousel19Parser from './parsers/carousel19.js';
import modal20Parser from './parsers/modal20.js';
import hero21Parser from './parsers/hero21.js';
import hero22Parser from './parsers/hero22.js';
import columns23Parser from './parsers/columns23.js';
import modal24Parser from './parsers/modal24.js';
import modal25Parser from './parsers/modal25.js';
import columns26Parser from './parsers/columns26.js';
import fragment27Parser from './parsers/fragment27.js';
import carousel28Parser from './parsers/carousel28.js';
import embed__video_29Parser from './parsers/embed__video_29.js';
import tabs30Parser from './parsers/tabs30.js';
import modal31Parser from './parsers/modal31.js';

import { generateDocumentPath, handleOnLoad, postTransformRules } from './import.utils.js';

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
      'Modal 1': modal1Parser,
    'Columns 2': columns2Parser,
    'Modal 3': modal3Parser,
    'Modal 4': modal4Parser,
    'Quote (with attribution) 5': quote__with_attribution_5Parser,
    'Modal 6': modal6Parser,
    'Tabs 7': tabs7Parser,
    'Accordion 8': accordion8Parser,
    'Hero 9': hero9Parser,
    'Columns 10': columns10Parser,
    'Modal 11': modal11Parser,
    'Accordion 13': accordion13Parser,
    'Hero 14': hero14Parser,
    'Modal 15': modal15Parser,
    'Modal 16': modal16Parser,
    'Table (striped & bordered) 17': table__striped___bordered_17Parser,
    'Cards 18': cards18Parser,
    'Carousel 19': carousel19Parser,
    'Modal 20': modal20Parser,
    'Hero 21': hero21Parser,
    'Hero 22': hero22Parser,
    'Columns 23': columns23Parser,
    'Modal 24': modal24Parser,
    'Modal 25': modal25Parser,
    'Columns 26': columns26Parser,
    'Fragment 27': fragment27Parser,
    'Carousel 28': carousel28Parser,
    'Embed (video) 29': embed__video_29Parser,
    'Tabs 30': tabs30Parser,
    'Modal 31': modal31Parser,
};

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, url, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });

  // post transform rules
  postTransformRules({
    root: main,
    document,
    url,
    originalURL,
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  (fragment.instances || [])
    .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
    .map(({ xpath }) => ({ xpath, element: WebImporter.Import.getElementByXPath(document, xpath) }))
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

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    // fetch the inventory
    const publishUrl = 'https://issue-25--czdemowevo--aemdemos.aem.page';

    /* eslint-disable-next-line no-undef */
    const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
    let inventory = null;
    try {
      const inventoryResp = await fetch(inventoryUrl.href);
      inventory = await inventoryResp.json();
    } catch (e) {
      const inventoryResp = await fetch(`${window.location.origin}/tools/importer/inventory.json`);
      inventory = await inventoryResp.json();
    }

    if (!inventory) {
      console.error('Failed to fetch inventory');
      return [];
    }

    // perform the transformation
    let main = null;
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
      return [{
        element: main,
        path: fragment.path,
      }];
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      return [{
        element: main,
        path: generateDocumentPath(source),
      }];
    }
  },
};
