/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Border_Video_Border_Top_Width extends TestFlow {
	public AG_Border_Video_Border_Top_Width() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Border");
		testMap.put("testChildCaseInit", "AG_Border_Video_Border_Top_Width");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "0");
				put("screenshot", "AG_Border_Video_Border_Top_Width_01_0");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "1");
				put("screenshot", "AG_Border_Video_Border_Top_Width_02_1");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "3");
				put("screenshot", "AG_Border_Video_Border_Top_Width_03_3");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
