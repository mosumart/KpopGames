import test from 'node:test';import assert from 'node:assert/strict';import {seedQuestions,GROUPS} from '../data/seed.js';
const bank=seedQuestions();
test('bank has over 100 questions and unique IDs',()=>{assert.ok(bank.length>100);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length)});
test('answers and options have exactly one matching key',()=>{for(const q of bank){assert.equal(q.options.filter(o=>o===q.answer).length,1,q.id);assert.ok(q.source.startsWith('https://'));assert.equal(q.approved,true);assert.ok(q.explanation)}});
test('each group has official source and bank content',()=>{for(const g of GROUPS){assert.ok(g.source.startsWith('https://'));assert.ok(bank.some(q=>q.group===g.name))}});
test('all true false are keyed',()=>{for(const q of bank.filter(q=>q.mode==='truefalse'))assert.ok(['Betul','Salah'].includes(q.answer))});
